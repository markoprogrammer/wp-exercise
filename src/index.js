увучи "./test.js";
увучи "./testfolder/hoho.js";
увучи "./testfolder/test2.js";


класа Пиће {
    конструктор () {
        ово.назив = ''
    }
}

класа Кафа наслеђује Пиће {
    конструктор () {
        super();
        ово.назив = 'Кафа'
    }

    попиј () {
        испиши('Ммммм... кафа')
    }
}

дај да мојаКафа буде нова Кафа()
мојаКафа.попиј()


испиши('Ммммм... кафа')