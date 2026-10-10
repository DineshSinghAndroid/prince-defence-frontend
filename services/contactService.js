const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createContact = async (contactData) => {
    const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to submit enquiry"
        );
    }

    return data;
};