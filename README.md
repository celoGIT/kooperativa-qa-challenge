Requirements Breakdown (Checklist):

- [x]Tech Stack: Playwright, TypeScript, Page Object Model (POM).
- [x]Test Target: Verejne dostupný e-shop (podľa vlastného výberu).
- [x]Test Data: Hľadaný tovar, musí byť parametrizovaný a načítaný z externého súboru (.json).
- [x]Positive E2E Scenario: Vyhľadanie špecifického tovaru, vloženie do košíka a validácia obsahu košíka.
- [x]Negative Scenario: Interakcia s neexistujúcim alebo nedostupným tovarom a validácia očakávaného chybového stavu.
- [x]CI/CD Integration: Konfigurácia automatizovanej pipeline (napr. GitHub Actions) pre automatické spustenie testov pri nahratí kódu.
- [ ]Reporting: Generovanie a uloženie reportu o výsledku testov z pipeline.
- [ ]Dokumentácia: Súhrn zvoleného prístupu, architektúry, prekážok a technických rozhodnutí v README.

Poznámky:
Verejne dostupný e-shop - zvolil som si demoblaze.com, predchadzam tak problemom s anti-bot ochranou a vyhybam sa neocakavanym zmenam na landing page - pop-up reklama, dotazniky, zlavove kupony pre prvy nakup a pod.
Pri prvom pokuse o spustenie testov som sa stretol s jednym fail testom vo firefoxe. Za normalnych okolnosti pushujem len plne funkcne upravy, rad by som ale zaznamenal proces debuggingu. 
Pri firefoxe nastal problem s asynchronnym cakanim na vyskakovacie okno. Vyriesil som to metodou "waitForEvent".
Pridany text do "Technicke rozhodnutia a prekazky".

Technicke rozhodnutia a prekazky:
Negativny scenar: E-shop Demoblaze neobsahuje funkcionalitu vyhladavania a nevracia explicitnu chybovu hlasku pri absencii tovaru. Validacia chyboveho stavu je preto implementovana iteraciou cez vsetky dostupne stranky e-shopu pomocou paginacie. Na kazdej nacitanej stranke sa aserciou toBeHidden() overuje, ze sa neexistujuci produkt nevykresli v DOM strukture.
Druhe zlyhanie v poradi nastalo v dosledku pomalsieho vykonu GitHub Actions runnera. Iteracia cez stranky e-shopu a cakanie na sietove odpovede prekrocili standardny limit 30 sekund.
Tretie zlyhanie nastalo pri lokalnom overeni zmien - Tlacidlo pre dalsiu stranku (#next2) zostava v DOM strukture viditelne aj po dosiahnuti konca katalogu. Skript nan v poslednej iteracii klikne, inicializuje cakanie na sietovu odpoved, no backend uz ziadne nove data neposle. APlikovany timeout na 5 sekund a metoda try...catch.
