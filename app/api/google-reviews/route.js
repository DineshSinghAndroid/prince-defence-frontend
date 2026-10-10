const PLACE_SEARCH_QUERY =
    "Prince Defence Academy, Palwas Rd, Sikar, Palwas, Rajasthan 332042, India";

const GOOGLE_PLACES_URL =
    "https://places.googleapis.com/v1/places:searchText";

export async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
        return Response.json(
            {
                code: "NOT_CONFIGURED",
                error: "Google Places API is not configured.",
            },
            { status: 503 }
        );
    }

    let googleResponse;

    try {
        googleResponse = await fetch(GOOGLE_PLACES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask":
                    "places.id,places.displayName,places.googleMapsUri,places.reviews",
            },
            body: JSON.stringify({
                textQuery: PLACE_SEARCH_QUERY,
                maxResultCount: 5,
                languageCode: "en",
            }),
            signal: AbortSignal.timeout(8000),
        });
    } catch {
        return Response.json(
            { error: "Could not connect to Google Places." },
            { status: 502 }
        );
    }

    if (!googleResponse.ok) {
        return Response.json(
            { error: "Google Places rejected the reviews request." },
            { status: 502 }
        );
    }

    let data;

    try {
        data = await googleResponse.json();
    } catch {
        return Response.json(
            { error: "Google Places returned an invalid response." },
            { status: 502 }
        );
    }
    const place = data.places?.find((candidate) =>
        candidate.displayName?.text
            ?.toLowerCase()
            .includes("prince defence academy")
    );

    if (!place) {
        return Response.json(
            { error: "The academy listing was not found on Google Places." },
            { status: 404 }
        );
    }

    const reviews = (place.reviews || [])
        .filter(
            (review) =>
                Number.isFinite(review.rating) &&
                review.rating > 4 &&
                (review.text?.text || review.originalText?.text)
        )
        .sort(
            (first, second) => {
                const firstTime =
                    Date.parse(first.publishTime || "") || 0;
                const secondTime =
                    Date.parse(second.publishTime || "") || 0;

                return secondTime - firstTime;
            }
        )
        .slice(0, 5)
        .map((review) => ({
            authorName:
                review.authorAttribution?.displayName || "Google user",
            authorUrl: review.authorAttribution?.uri || "",
            rating: review.rating,
            text: review.text?.text || review.originalText?.text || "",
            publishTime: review.publishTime || "",
            relativeTime: review.relativePublishTimeDescription || "",
            googleMapsUrl: place.googleMapsUri || "",
        }));

    return Response.json(
        { reviews },
        {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        }
    );
}
