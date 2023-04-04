
export type FormVypocetType = {
    balik: string | null
    pripoistenia: SelectOption[] | null
    variant: string|null
    pocet: number
    zaciatok: Date | null
    koniec: Date | null |string

}

export type SelectOption = {
    label: string
    value: string
}