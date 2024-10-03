export {}
declare global {
    interface ProductFormStructure {
        quantity: boolean
        categories: boolean
        fields: (InputField | RadioField | InlineField)[]
    }
    interface ProductStructureBase {
        name: string
        order?: number
    }

    interface InputField extends ProductStructureBase {
        type: "input" | "textarea"
    }

    interface RadioField extends ProductStructureBase {
        type: "radio" | "selectOne"
        style?: "inline-box"
        values: string[]
    }
    interface InlineField extends ProductStructureBase {
        type: "_inline"
        fields: InputField[]
    }

    type ProductStructure = InputField | RadioField

    interface InlineProductStructure {
        [key: string]: InlineField
        [key: string]: InlineField
    }

    interface VelorisConfig {
        itemFormStruct: ProductFormStructure
        sections: {
            base: Section
            store?: Section
            blogs?: Section
            settings?: Section
            dev?: Section
        }
    }

    interface ItemSettings {
        quantity: boolean
        categories?: boolean
    }

    interface Page {
        name: string
        url: string
        icon: string
        subpages?: SubPage[]
    }

    interface SubPage {
        name: string
        url: string
    }

    interface Section {
        switch: boolean
        order: number
        pages: Page[]
        settings?: {
            categories: boolean
        }
    }
}
