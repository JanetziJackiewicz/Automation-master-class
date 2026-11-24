import { Locator,Page } from "@playwright/test";

export class MeasurementsPage {
    
    readonly page: Page;
    readonly pesoInput: Locator;
    readonly grasaInput: Locator;
    readonly musculoInput: Locator;
    readonly cinturaInput: Locator;
    readonly submitButton: Locator;
    readonly newMeasurementButton : Locator;
    readonly contenedorGrupo: Locator;
    readonly listaRegistros: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pesoInput = page.getByRole('textbox', { name: 'Weight (kg)' });
        this.grasaInput = page.getByRole('textbox', { name: 'Fat % (%)' });
        this.musculoInput = page.getByRole('textbox', { name: 'Muscle (kg)' });
        this.cinturaInput = page.getByRole('textbox', { name: 'Waist (cm)' });
        this.newMeasurementButton = page.getByRole('button', { name: 'New measurement' });
        this.submitButton = page.getByRole('button', { name: 'Save measurement' });
        this.contenedorGrupo = this.page.locator('.flex.flex-col.gap-4');
        this.listaRegistros = this.contenedorGrupo.locator('details.group.rounded-2xl.border.border-line.bg-surface > summary');
    }

    async fillWeight(Weight: string) {
        await this.pesoInput.fill(Weight);
    }

    async fillFatPercentage(FatPercentage: string) {
        await this.grasaInput.fill(FatPercentage);
    }

    async fillMuscle(Muscle: string) {
        await this.musculoInput.fill(Muscle);
    }

    async fillWaist(Waist: string) {
        await this.cinturaInput.fill(Waist);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }
    
     async clickNewMeasurementButton(){
        await this.newMeasurementButton.click();
    }
    
    async Body(weight: string, fatPercentage: string, muscle: string, waist: string) {
        await this.fillWeight(weight);
        await this.fillFatPercentage(fatPercentage);
        await this.fillMuscle(muscle);
        await this.fillWaist(waist);
        await this.clickSubmitButton();
    }

    async getMeasurementRow(weight: string) {
        return this.page.getByText(`${weight} kg`).first(); 
    }

    async countRowsMesurements() : Promise<number> {
        await this.listaRegistros.first().waitFor({ state: 'visible' });
        return await this.listaRegistros.count();
    }

    async selectRowRandowsMeasurement():Promise<number> {
        const totalRows = await this.countRowsMesurements();
        const randomIndex = Math.floor(Math.random() * totalRows);

        const rowSelect = this.listaRegistros.nth(randomIndex);
        await rowSelect.waitFor({ state: 'visible' });
        await rowSelect.click();
        return randomIndex;
    }

    async randowsweight() : Promise<number> {
        const total = 100;
        const randomweight = Math.floor(Math.random() * total);
        return randomweight;
    }
    async editWeight() {
        const nuevoPeso = await this.randowsweight();
        await this.pesoInput.clear(); // Limpiamos el valor anterior
        await this.pesoInput.fill(nuevoPeso.toString());
        await this.clickSubmitButton();
    }

}