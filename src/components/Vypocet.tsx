import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {FormVypocetType, SelectOption} from "./types";
import {vypocetFormSchema} from "./validation";
import PrettyPrint from "../shared/PrettyPrint";
import {Button, Container} from "react-bootstrap";
import Select from 'react-select';
import {VpInput} from "../layout/VpInput";


export default function Vypocet() {
    const [cena, setCena] = useState(0);
    const cpForm: FormVypocetType = {
        balik: null,
        pocet: 1,
        pripoistenia: [],
        variant: null,
        zaciatok: null,
        koniec: null

    }

    const optionsPripoistenia: SelectOption[] = [
        {label: 'Storno', value: 'storno'},
        {label: 'Športové aktivity', value: 'sport'}
    ]

    function getDays(values: FormVypocetType): number {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.abs((new Date(values.koniec!).getTime() - new Date(values.zaciatok!).getTime()) / (oneDay))
    }

    function getSadzba(values: FormVypocetType) {
        if (values.variant === 'kratkodobe') {
            let diffDays = getDays(values)
            let sadzba = 0
            switch (values.balik) {
                case 'zakladny': {
                    sadzba = 1.2
                    break;
                }
                case 'rozsireny': {
                    sadzba = 1.8
                    break;
                }
                case 'extra': {
                    sadzba = 2.4
                    break;
                }
            }
            let prirazka = 1
            if (values.pripoistenia && values.pripoistenia.length > 0) {
                if (values.pripoistenia.length == 2) {
                    prirazka = 1.8
                } else {
                    if (values.pripoistenia[0].value === 'storno') {
                        prirazka = 1.5
                    } else {
                        prirazka = 1.3
                    }
                }
            }
            setCena(+(sadzba * prirazka * values.pocet * diffDays).toFixed(2))
        } else {
            //     celorocne
            let _cena = 0
            switch (values.balik) {
                case 'zakladny': {
                    _cena = 39
                    break;
                }
                case 'rozsireny': {
                    _cena = 49
                    break;
                }
                case 'extra': {
                    _cena = 59
                    break;
                }
            }
            let prirazka = 1
            if (values.pripoistenia && values.pripoistenia.length > 0) {
                if (values.pripoistenia.length == 2) {
                    prirazka = 1.3
                } else {
                    if (values.pripoistenia[0].value === 'storno') {
                        prirazka = 1.2
                    } else {
                        prirazka = 1.1
                    }
                }
            }
            setCena(+(_cena * prirazka * values.pocet ).toFixed(2))
        }
    }

    return (
        <div className="App">
            <Formik
                initialValues={cpForm}
                validationSchema={vypocetFormSchema}
                onSubmit={getSadzba}
            >
                {({isSubmitting, values, errors, setFieldValue}) => (
                    <>
                        {/* for development use*/}
                        {/*<PrettyPrint data={values}/>*/}
                        {/*<PrettyPrint data={errors}/>*/}
                        <Form>
                            <Container className={'mw-50'}>
                                <VpInput>
                                    <label  className={'col-form-label'}>Variant poistenia </label>
                                    <>
                                        <Field name="variant" as="select" className="form-control">
                                            <option value=""></option>
                                            <option value="kratkodobe">Kratkodobe poistenie</option>
                                            <option value="celorocne">Celorocne poistenie</option>
                                        </Field>
                                        <ErrorMessage className="text-danger" name="variant" component="div"/>
                                    </>

                                </VpInput>
                                <VpInput>
                                    <label className={'col-form-label'}>Balik poistenia </label>
                                    <>
                                        <Field name="balik" as="select" className="form-control">
                                            <option value=""></option>
                                            <option value="zakladny">Zakladny</option>
                                            <option value="rozsireny">Rozsireny</option>
                                            <option value="extra">Extra</option>
                                        </Field>
                                        <ErrorMessage className="text-danger" name="balik" component="div"/>
                                    </>
                                </VpInput>
                                <VpInput>
                                    <label className={'col-form-label'}>Pripoistenia </label>

                                    <>
                                        {/*<div style={{width: '20vw', textAlign: "center"}}>*/}
                                            <Select
                                                // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                isMulti
                                                onChange={(value) => {
                                                    setFieldValue('pripoistenia', value)
                                                }
                                                }

                                                name="pripoistenia"
                                                options={optionsPripoistenia}
                                                className="width:auto;"
                                                classNamePrefix="select"
                                            />
                                        {/*</div>*/}
                                        <ErrorMessage className="text-danger" name="pripoistenia" component="div"/>
                                    </>
                                    {/*<Select*/}
                                    {/*    placeholder = 'Select'*/}
                                    {/*    name='pripoistenia'*/}
                                    {/*    isMulti*/}
                                    {/*    onChange={onChange}*/}
                                    {/*    onBlur={setTouched}*/}
                                    {/*/>*/}
                                    {/*<Field placeholder="Zvolte" name="pripoistenia" as="select" className="form-control">*/}

                                    {/*    <option value=""></option>*/}
                                    {/*    <option value="storno">Storno cesty</option>*/}
                                    {/*    <option value="sport">Sportove aktivity</option>*/}
                                    {/*</Field>*/}

                                </VpInput>
                                <VpInput>

                                    <label>Zaciatok poistenia </label>
                                    <>
                                        <Field type="date" name="zaciatok"/>
                                        <ErrorMessage className="text-danger" name="zaciatok" component="div"/>
                                    </>
                                </VpInput>
                                <VpInput>
                                    <label className={'col-form-label'}>Koniec poistenia </label>
                                    <>
                                        <Field type="date" name="koniec"/>
                                        <ErrorMessage className="text-danger" name="koniec" component="div"/>
                                    </>
                                </VpInput>
                                <VpInput>
                                    <label className={'col-form-label'}>Pocet osob </label>
                                    <>    <Field type="number" name="pocet"/>

                                        <ErrorMessage className="text-danger " name="pocet" component="div"/>
                                    </>
                                </VpInput>
                                <ErrorMessage className="text-danger " name="incorrectDate" component="div"/>

                                <Button type={"submit"}>Vypočitaj</Button>
                            </Container>
                        </Form>

                    </>
                )}
            </Formik>
            {cena > 0 && <div>Cena je {cena}</div>}
        </div>
    )
}

