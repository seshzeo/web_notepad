import { NotePad } from "./notepad";

myNote = new NotePad();

let notesList = [
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero? Voluptatem quo, suscipit libero, impedit velit magnam culpa,
    placeat consequatur
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero? Voluptatem quo, suscipit libero,
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero? Voluptatem quo, suscipit libero, impedit velit magnam culpa,
    placeat consequatur atque aliquid cum voluptatibus laboriosam totam.
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero? Voluptatem quo, suscipit libero, impedit velit magnam culpa,
    placeat consequatur atque aliquid cum
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero?
    `],
    ['Название заметки', `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Illo animi aliquid autem officia libero? Voluptatem quo, suscipit libero, impedit velit magnam culpa,
    placeat consequatur atque aliquid cum voluptatibus laboriosam totam.
    `],

]

let it = 0;
for (const el of notesList) {
    myNote._add_note(myNote._creat_note_div(el[0] + ' ' + it, el[1]));
    it++;
}
myNote._add_note(myNote._create_note_template());





