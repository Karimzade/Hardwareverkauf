async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const htmlContent = await response.text();
      document.getElementById(elementId).innerHTML = htmlContent;
    } else {
      console.error(`Fehler beim Laden von: ${filePath}`);
    }
  } catch (error) {
    console.error("Netzwerkfehler beim Laden des Components:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("uber-uns-component", "seiten/ueber-uns.html");
  loadComponent("angebote-component", "seiten/angebote.html");
  loadComponent("kontakt-component", "seiten/kontakt.html");
  //   loadComponent("produkte-component", "seiten/produkte.html");

  // loadComponent("angebote-component", "seiten/angebote.html");
  // loadComponent("kontakt-component", "seiten/kontakt.html");
});
