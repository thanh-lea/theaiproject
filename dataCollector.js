// Fonction pour télécharger les données sous forme de fichier CSV
function downloadCSV(data) {
    var csvContent = "data:text/csv;charset=utf-8,";

    // Crée le contenu CSV en concaténant les données avec des retours à la ligne
    data.forEach(function(row) {
        csvContent += row + "\n";
    });

    // Crée un objet URL à partir du contenu CSV
    var encodedUri = encodeURI(csvContent);

    // Crée un élément <a> pour le téléchargement
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");

    // Simule un clic sur le lien pour déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
}

// Fonction pour scroller et collecter les données de manière "humaine"
function scrollAndCollectData() {
    var scrollCount = 0;
    var collectedData = []; // Stocke les données collectées

    function scrollAndCollect() {
        window.scrollTo(0, document.body.scrollHeight);
        scrollCount++;

        if (scrollCount === 3) {
            setTimeout(function() {
                // Collecte les données des balises <span>
                var spans = document.querySelectorAll('span[dir="ltr"]');
                spans.forEach(function(span) {
                    collectedData.push(span.textContent.trim());
                });

                // Télécharge les données dans un fichier CSV
                downloadCSV(collectedData);
            }, 10000);
        } else {
            setTimeout(scrollAndCollect, 10000);
        }
    }

    scrollAndCollect();
}

// Commence le processus de scrolling et de collecte
scrollAndCollectData();
