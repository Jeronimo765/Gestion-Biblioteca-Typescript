class Publicacion {
    public titulo: string;
    public autor: string;
    public año: number;
    public disponible: boolean;

    constructor(titulo: string, autor: string, año: number, disponible: boolean = true) {
        this.titulo = titulo;
        this.autor = autor;
        this.año = año;
        this.disponible = disponible;
    }

    mostrarInfo(): string {
        return `Publicación: "${this.titulo}"  Autor: ${this.autor}  Año: ${this.año}  Disponible: ${this.disponible ? "Sí" : "No"}`;
    }

    prestar(): void {
        if (this.disponible) {
            this.disponible = false;
            console.log(`"${this.titulo}" ha sido prestado.`);
        } else {
            console.log(`"${this.titulo}" no está disponible actualmente.`);
        }
    }

    devolver(): void {
        if (!this.disponible) {
            this.disponible = true;
            console.log(`"${this.titulo}" ha sido devuelto.`);
        } else {
            console.log(`"${this.titulo}" ya estaba disponible.`);
        }
    }
}

class Libro extends Publicacion {
    paginas: number;
    genero: string;

    constructor(titulo: string, autor: string, año: number, disponible: boolean, paginas: number, genero: string) {
        super(titulo, autor, año, disponible);
        this.paginas = paginas;
        this.genero = genero;
    }

    mostrarInfo(): string {
        return `Libro: "${this.titulo}"  Autor: ${this.autor}  Año: ${this.año}  Género: ${this.genero}  Páginas: ${this.paginas}  Disponible: ${this.disponible ? "Sí" : "No"}`;
    }
}

class Revista extends Publicacion {
    numeroEdicion: number;
    mesPublicacion: string;

    constructor(titulo: string, autor: string, año: number, disponible: boolean, numeroEdicion: number, mesPublicacion: string) {
        super(titulo, autor, año, disponible);
        this.numeroEdicion = numeroEdicion;
        this.mesPublicacion = mesPublicacion;
    }

    mostrarInfo(): string {
        return `Revista: "${this.titulo}"  Autor: ${this.autor}  Año: ${this.año}  Edición N°${this.numeroEdicion} (${this.mesPublicacion})  Disponible: ${this.disponible ? "Sí" : "No"}`;
    }
}

interface Usuario {
    nombre: string;
    id: number;
    mostrarHistorial(): void;
}

class Lector implements Usuario {
    nombre: string;
    id: number;
    historial: Publicacion[];

    constructor(nombre: string, id: number) {
        this.nombre = nombre;
        this.id = id;
        this.historial = [];
    }

    prestarPublicacion(pub: Publicacion): void {
        if (pub.disponible) {
            pub.prestar();
            this.historial.push(pub);
        } else {
            console.log(`${this.nombre} no puede prestar "${pub.titulo}" porque no está disponible.`);
        }
    }

    mostrarHistorial(): void {
        if (this.historial.length === 0) {
            console.log(`${this.nombre} no tiene préstamos registrados.`);
        } else {
            console.log(`Historial de ${this.nombre}:`);
            this.historial.forEach((pub) => console.log(` ${pub.titulo}`));
        }
    }
}


const libro1: Libro = new Libro("Don Quijote de la Mancha", "Miguel de Cervantes", 1943, true, 120, "Aventura");
console.log(libro1.mostrarInfo());

const libro2: Libro = new Libro("El coronel no tiene quien le escriba", "Gabriel García Márquez", 1980, false, 150, "Drama");
console.log(libro2.mostrarInfo());

const revista1: Revista = new Revista("Noticias El Quindiano", "Varios", 2024, true, 120, "Abril");
console.log(revista1.mostrarInfo());

const revista2: Revista = new Revista("Crónica del Quindío", "Un escritor", 2025, false, 300, "Enero");
console.log(revista2.mostrarInfo());

const lector1: Lector = new Lector("Armando", 1);
const lector2: Lector = new Lector("María López", 2);

lector1.prestarPublicacion(libro1);
lector1.prestarPublicacion(revista1);
lector2.prestarPublicacion(libro1);

console.log(revista1.mostrarInfo());

lector1.mostrarHistorial();
lector2.mostrarHistorial();
