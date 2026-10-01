Requirements Breakdown (Checklist):

- [✔]Tech Stack: Playwright, TypeScript, Page Object Model (POM).
- [✔]Test Target: Verejne dostupný e-shop (podľa vlastného výberu).
- [✔]Test Data: Hľadaný tovar, musí byť parametrizovaný a načítaný z externého súboru (.json).
- [✔]Positive E2E Scenario: Vyhľadanie špecifického tovaru, vloženie do košíka a validácia obsahu košíka.
- [✔]Negative Scenario: Interakcia s neexistujúcim alebo nedostupným tovarom a validácia očakávaného chybového stavu.
- [ ]CI/CD Integration: Konfigurácia automatizovanej pipeline (napr. GitHub Actions) pre automatické spustenie testov pri nahratí kódu.
- [ ]Reporting: Generovanie a uloženie reportu o výsledku testov z pipeline.
- [ ]Dokumentácia: Súhrn zvoleného prístupu, architektúry, prekážok a technických rozhodnutí v README.

Poznámky:
Verejne dostupný e-shop - zvolil som si demoblaze.com, predchadzam tak problemom s anti-bot ochranou a vyhybam sa neocakavanym zmenam na landing page - pop-up reklama, dotazniky, zlavove kupony pre prvy nakup a pod.
Pri prvom pokuse o spustenie testov som sa stretol s jednym fail testom vo firefoxe. Za normalnych okolnosti pushujem len plne funkcne upravy, rad by som ale zaznamenal proces debuggingu. 
Pri firefoxe nastal problem s asynchronnym cakanim na vyskakovacie okno. Vyriesil som to metodou "waitForEvent".
Pridany text do "Technicke rozhodnutia a prekazky".

Technicke rozhodnutia a prekazky:
Negativny scenar: E-shop Demoblaze neobsahuje funkcionalitu vyhladavania a nevracia explicitnu chybovu hlasku pri absencii tovaru. Validacia chyboveho stavu je preto implementovana iteraciou cez vsetky dostupne stranky e-shopu pomocou paginacie. Na kazdej nacitanej stranke sa aserciou toBeHidden() overuje, ze sa neexistujuci produkt nevykresli v DOM strukture.

