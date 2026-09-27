ranking system:

service methode:
communityservice holt username und exerciseids vom repo
->entryservice holt die besten 1rms von jedem user und jeder exercise
->für total wird zusammengerechnet wenn nix da ist dann 0


controller
->send objekt zurück mit Map <username, [](record mit:exercisename, best1rm )>

frontend page + fetch