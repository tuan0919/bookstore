import { IconButton, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import vnSVG from '~/assets/vn.svg';
import usSVG from '~/assets/us.svg';
import { useTranslation } from 'react-i18next';

function VNLang() {
    return <img src={vnSVG} width={30} height={30} alt="vn" />;
}

function USLang() {
    return <img src={usSVG} width={30} height={30} alt="us" />;
}

export function LanguageButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="language-button"
                aria-controls={open ? "language-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                disableRipple
                sx={{
                    border: '2px solid',
                    borderColor: grey[700],
                    padding: 0,
                }}
            >
                {currentLang === 'vi' ? <VNLang /> : <USLang />}
            </IconButton>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    "aria-labelledby": "language-button",
                }}
            >
                <MenuItem onClick={() => handleClose('vi')}>
                    🇻🇳 {t('navbar.language.vi')}
                </MenuItem>
                <MenuItem onClick={() => handleClose('en')}>
                    🇺🇸 {t('navbar.language.en')} 
                </MenuItem>
            </Menu>

           
        </div>
    );
}
