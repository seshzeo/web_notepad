class StorageManager_ {
    constructor() {
        this.notes = [];
        this.update_notes();
    }

    // загружает заметки из localStorage в массив заметок в StorageManager_
    update_notes() {
        // итерация по элементам из localStorage, в которых сохранены заметки
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('note')) {
                let index = +(key.replace('note',''));
                this.notes[index] = JSON.parse(localStorage.getItem(key));
            }
        }
    }

    for_all_notes(callback) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('note')) {
                callback(key);
            }
        }
    }

    get length() {
        // this.update_notes();
        return this.notes.length;
    }

    set length(value) {
        this.update_notes();
        this.notes.length = value;
    }

    remove_note(id) {
        console.log(this.notes);
        this.notes.splice(id, 1);
        console.log(this.notes);
        localStorage.removeItem(id+'note');
    }

    get_note(id) {
        return this.notes[id];
    }

    set_note(i, value) {
        let value_str = JSON.stringify(value);
        localStorage.setItem(i + 'note', value_str); // сохраняем данные в localStorage
        this.notes[i] = value; // сохраняем данные в notes
        this.update_notes();
    }
}


class NoteView {
    constructor() {
        this.notepad_wrapper = document.querySelector('.notepad_wrapper');
        this.StorMan = new StorageManager_();
        let i = 0;
        for(let i = 0; i < this.StorMan.length; i++) {
            let note_data = this.StorMan.get_note(i);
            if (note_data) {
                this.notepad_wrapper.appendChild(this.create_note_div(
                    false,
                    i,
                    note_data.title,
                    note_data.text
                ));
            }
        }
        this._can_create_new_note = true;
    }

    create_note_div(is_template, id, title, text) {
        // корневой шаблон
        let note_div = document.createElement('div');
        note_div.className += 'note';
        note_div.id = id;

        //поля для ввода заголовка и текста
        let input = document.createElement('input');
        input.className += 'h3_input';
        input.placeholder = 'Название заметки';
        input.minLength="10";
        let textarea = document.createElement('textarea');
        textarea.className += 'p_input'; 
        textarea.placeholder = 'Текст заметки';
        textarea.rows="15";
        textarea.cols="30";
        textarea.required = true;
        textarea.minLength="20";

        // кнопки работы с заметкой
        let buttons = document.createElement('div');
        buttons.className += 'note_footer';
        
        let save_btn = document.createElement('a');
        save_btn.text = 'Сохранить';
        save_btn.className += 'save_btn';
        save_btn.onclick = () => this.save_note(id);

        let remove_btn = document.createElement('a');
        remove_btn.text = 'Удалить';
        remove_btn.className += 'remove_btn';
        remove_btn.onclick = () => this.remove_div_note(id);

        let edit_btn = document.createElement('a');
        edit_btn.text = 'Редактировать';
        edit_btn.className += 'edit_btn';
        edit_btn.onclick = () => this.edit_div_note(id);

        buttons.appendChild(save_btn);
        buttons.appendChild(remove_btn);
        buttons.appendChild(edit_btn);

        // поля для отображения информации заметки. По умолчанию скрыты.
        let h3 = document.createElement('h3');
        h3.innerHTML = title;
        h3.className += 'note_title';
        let p = document.createElement('p');
        p.innerHTML = text;
        p.className += 'note_text';

        input.hidden = !is_template;
        textarea.hidden = !is_template;
        h3.hidden = is_template;
        p.hidden = is_template;
        save_btn.hidden = !is_template;
        remove_btn.hidden = is_template;
        edit_btn.hidden = is_template;

        //добавление всех элементов
        note_div.appendChild(input);
        note_div.appendChild(textarea);
        note_div.appendChild(h3);
        note_div.appendChild(p);
        note_div.appendChild(buttons);
        return note_div;
    }

    add_new_note(is_template, note_info, id) {
        if (this._can_create_new_note) {
            this._can_create_new_note = false;
            this.notepad_wrapper.appendChild(this.create_note_div(
                is_template,
                id,
                note_info.title,
                note_info.text)
            );
            this.StorMan.set_note(id, note_info);
        }
    }

    remove_div_note(id) {
        if (this._can_create_new_note) {
            // this.StorMan.notes.splice(id,1);
            document.getElementById(id).style = 'display: none;';
            this.StorMan.remove_note(id);
        }
    }

    edit_div_note(id) {
        if (this._can_create_new_note) {
            let note_div = document.getElementById(id);
            this.change_mode(note_div);
        }
    }

    change_mode(note_div) {
        note_div.querySelector('.h3_input').hidden = !note_div.querySelector('.h3_input').hidden;
        note_div.querySelector('.p_input').hidden = !note_div.querySelector('.p_input').hidden;
        note_div.querySelector('.note_title').hidden = !note_div.querySelector('.note_title').hidden;
        note_div.querySelector('.note_text').hidden = !note_div.querySelector('.note_text').hidden;
        note_div.querySelector('.save_btn').hidden = !note_div.querySelector('.save_btn').hidden;
        note_div.querySelector('.remove_btn').hidden = !note_div.querySelector('.remove_btn').hidden;
        note_div.querySelector('.edit_btn').hidden = !note_div.querySelector('.edit_btn').hidden;
    }

    save_note(id) {
        let note_div = document.getElementById(id);
        let input = note_div.querySelector('.h3_input');
        let textarea = note_div.querySelector('.p_input');

        this.StorMan.set_note(id, {
            'title' : encodeURI(input.value),
            'text' : encodeURI(textarea.value)
        })
        note_div.querySelector('.note_title').innerHTML = input.value;
        note_div.querySelector('.note_text').innerHTML = textarea.value;
        this.change_mode(note_div);
        this._can_create_new_note = true;
    }
}

myNote = new NoteView();

new_note_button = document.querySelector('.new_note');
new_note_button.onclick = () => {
    id = myNote.StorMan.length;
    myNote.add_new_note(is_template = true, note_info = {'title': ' ', 'text': ' '}, id=id);
}