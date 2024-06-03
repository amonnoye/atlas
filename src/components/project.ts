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

export class Team {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  resum: string;
  picture: string;
  isActive: number;
  orderBy: number;

  constructor(data: any) {
    this.id = data.id;
    this.nom = data.nom;
    this.prenom = data.prenom || '';
    this.poste = data.poste || '';
    this.resum = data.resum;
    this.picture = data.picture;
    this.orderBy = parseInt(data.orderBy, 10);
    this.isActive = parseInt(data.isActive, 10);
  }
}

export class Valeur {
  id: string;
  title: string;
  texte: string;
  subtitle: string;
  order_by: number;
  is_active: number;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.texte = data.texte || '';
    this.subtitle = data.subtitle || '';
    this.order_by = parseInt(data.order_by, 10);
    this.is_active = parseInt(data.is_active, 10);
  }
}
