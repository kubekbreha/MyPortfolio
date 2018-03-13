var chip = {
    tag: 'chip content',
    image: '', //optional
    id: 1, //optional
};

$('.chips').material_chip();
$('.chips-autocomplete').material_chip({
    autocompleteOptions: {
        data: {
            'Apple': null,
            'Microsoft': null,
            'Google': null
        },
        limit: Infinity,
        minLength: 1
    }
});