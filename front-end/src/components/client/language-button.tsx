"use client";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { useState } from "react";

function VNLang() {
    return (
        <Image src="/vn.svg" width={30} height={30} alt="vn"/>
    )
}

function USLang() {
    return (
        <Image src="/us.svg" width={30} height={30} alt="vn"/>
    )
}

export function LanguageButton() {
    // Đánh dấu chỉ phần này là Client Component
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [chosenLang, setChosenLang] = useState<string>('VN');
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (lang: string) => {
        setChosenLang(() => lang)
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
                    border: {
                        xs: '2px solid'
                    },
                    borderColor: grey['A700'],
                    padding: 0,
                }}
            >
                {chosenLang === 'VN' ? <VNLang/> : <USLang/>}
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
                <MenuItem onClick={() => handleClose("VN")}>🇻🇳 Tiếng Việt</MenuItem>
                <MenuItem onClick={() => handleClose("EN")}>🇺🇸 English</MenuItem>
            </Menu>
        </div>
    );
}