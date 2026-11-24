import { Page } from "@playwright/test";

export class Footer {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickToAcceptModalBodyFooter() {
        await this.page.getByRole('link', { name: 'Body' }).click();
    }
}