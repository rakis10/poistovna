import * as Yup from 'yup';

export const vypocetFormSchema = Yup.object()
    .shape({
        // emal: Yup.string().nullable().max(MAX_LENGTH_PORADOVE_CISLO),
        // password: Yup.string().nullable().max(MAX_LENGTH_ECV),
        // vin: Yup.string().nullable().max(MAX_LENGTH_VIN),
        variant: Yup.string().nullable().required(),
        balik: Yup.string().nullable().required(),
        // pripoistenia: Yup.object()
        //     .shape({
        //         .string().nullable().required()}),
        zaciatok: Yup.date().nullable().required(),
        pocet: Yup.number().nullable().required().max(3).min(1),
        koniec: Yup.date().nullable().required().min(
            Yup.ref('zaciatok'),
            "End date can't be before Start date"
        ).when('variant', {
            is: 'kratkodobe',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.notRequired(),
        })
    })
    // .test('Zvoľte aspoň jeden parameter', function (value) {
    //     if (value.zaciatok && value.koniec && value.koniec.toISOString() <= value.zaciatok.toISOString()) {
    //         return new Yup.ValidationError(
    //             'Koniec je dalej ako zaciatok',
    //             'incorrectDate',
    //             'incorrectDate'
    //         )
    //     }
    // })
