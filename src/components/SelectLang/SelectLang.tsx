import React, { useEffect, useState } from 'react'
import { Select } from '@blueprintjs/select'
import { available_langs, validLang, getLang, ILang, setLang, flags } from '../../utils/internationalization'
import { Button, MenuItem } from '@blueprintjs/core'
import SvgIcon from '../SvgIcon'

const LangSelect = Select.ofType<string>()

type IProps = {
    currentLang: ILang,
    langs: ILang[],
}

type IClickHandler = {
    handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}


const SelectLang = () => {

    const [currentLang, setCurrentLang] = useState<ILang>('es')
    const [langs, setLangs] = useState<ILang[]>([])

    const handleSelect = (item: string) => {
        console.log({item})
        let newLang = validLang(item)
        setCurrentLang(newLang)
        setLang(newLang)
    }

    useEffect(() => {
        setCurrentLang(getLang())
        setLangs(available_langs)
    }, [])

    const RenderLang = (item: string, {handleClick}: IClickHandler) => {
        let toRender = validLang(item)
        const flag = flags[toRender]

        return (
            <MenuItem
                key={item}
                text={item}
                onClick={handleClick}
                active={currentLang === item}
                icon={<SvgIcon src={flag} name={currentLang} /> }
            />
        )
    }

    return (
        <LangSelect
            items={langs}
            itemRenderer={RenderLang}
            onItemSelect={handleSelect}
            filterable={false}
        >
            <Button
                icon="globe-network"
                text={currentLang}
                rightIcon="caret-down"
            />
        </LangSelect>
    )
}

export default SelectLang
