document.addEventListener("DOMContentLoaded", () => {
    const contentGrid = document.querySelector(".content-grid");
    const pagesDir = "pages/";
    const imagesDir = "images/";

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const activities = data.activities;

            activities.forEach((activity, index) => {
                const activityFileName = `activity_${index}.html`;
                const activityFilePath = `${pagesDir}${activityFileName}`;

                // Create card for index.html
                const card = document.createElement("div");
                card.classList.add("card");

                let imageUrl = "";
                if (activity.images && activity.images.length > 0) {
                    imageUrl = `${imagesDir}${activity.images[0]}`;
                } else {
                    // Placeholder image if no image is available
                    imageUrl = "https://via.placeholder.com/300x200?text=No+Image";
                }

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${activity.title}" loading="lazy">
                    <div class="card-content">
                        <h3>${activity.title}</h3>
                        <p>${activity.content.length > 0 ? activity.content[0].substring(0, 100) + '...' : 'لا يوجد وصف.'}</p>
                        <a href="${activityFilePath}" class="read-more">اقرأ المزيد</a>
                    </div>
                `;
                if (contentGrid) {
                    contentGrid.appendChild(card);
                }

                // Generate individual activity page (this part will be handled by Python script)
                // For now, we just prepare the data structure
            });
            
            // This part is for generating individual activity pages via Python
            // The JavaScript here only handles the index page display.
            // A separate Python script will iterate through activities and create HTML files.
        })
        .catch(error => console.error("Error fetching data:", error));
});

// Lazy loading for images (already handled by loading="lazy" attribute in HTML)
// Intersection Observer can be added for more control if needed, but native lazy loading is good for static sites.
