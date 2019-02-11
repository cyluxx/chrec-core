export abstract class Action {
    constructor(private image: string) { }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string) {
        this.image = image;
    }
}