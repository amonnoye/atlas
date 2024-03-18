export class Project {
  id: string;
  title: string;
  texte: string;
  texte_gras: string;
  id_instagram: string;
  img_logo: string;
  order_by: number;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.texte = data.texte || '';
    this.texte_gras = data.texte_gras || '';
    this.id_instagram = data.id_instagram;
    this.img_logo = data.img_logo;
    this.order_by = parseInt(data.order_by, 10);
  }
}
