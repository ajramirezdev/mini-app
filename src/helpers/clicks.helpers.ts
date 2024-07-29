export const updateUserClicks = async (userID: number, clicks: number) => {
    try {
        const response = await fetch("http://localhost:3000/api/clicks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID, clicks }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating user clicks:", error);
        throw error;
    }
};
