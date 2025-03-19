
# ER-Modell

![ER-Modell](./ER-M odell.png)

#ER-Modell Erklärung:
Es bestehen 3 Entitäten, der Kunde, Buchung und Mitglied.

Das Mitglied besitzt den Primärschlüssel MitgliedID, dazu kommen die Attribute Name, Emainl und Telefonnummer.

Die Buchung hat den Primärschlüssel BuchungsID, die Beiden Fremdschlüssel MitgliedID und KursID. Hinzu kommt das Attribut Buchungsdatum.

Der Kurs besitzt den Primärschlüssel KursID und dazu die Attribute Trainer, Datum, Uhrzeit und Kursname.

Die Beziehung zwischen Mitglied und Buchung ist eine (1:n)-Beziehung, da ein Mitglied mehrere Buchenung machen kann, allerdings ein eine Buchung nur von einem Mitglied getätigt werden.
Auch zwischen Kurs und Buchung besteht eine (1:n)-Beziehung, da ein Kurs von mehreren buchungen gebucht werden können und ein Kurs von mehreren Buchungen gebucht werden können.
Zwischen Kurz und MItglied besteht somit eine(n:m)-Beziehung und Buchung wird als Relationstabelle verwendet.

# Wie starte man alles?