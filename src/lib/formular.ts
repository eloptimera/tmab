// Formulären är frikopplade från all backend (ingen databas, inget API, ingen tredjepartstjänst).
// Funktionerna behåller samma signaturer så att UI:t är oförändrat, men inget skickas någonstans.
// Koppla in en mottagare här när en backend finns.

async function skicka(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));
}

export type KontaktData = {
  namn: string;
  epost: string;
  telefon: string;
  meddelande: string;
};

export async function skickaKontakt(_data: KontaktData): Promise<void> {
  await skicka();
}

export type OffertData = {
  namn: string;
  telefon: string;
  epost: string;
  foretag: string;
  uppdragstyper: string[];
  budget: string | null;
  onskat_startdatum: string | null;
  meddelande: string;
  gdpr_samtycke: true;
};

export async function skickaOffert(_data: OffertData, _bilder: File[]): Promise<void> {
  await skicka();
}
