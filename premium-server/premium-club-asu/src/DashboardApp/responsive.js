import { css } from "styled-components"


export const mobile = (props) => {
    return css`
        @media screen and (max-width:768px ) {
            ${props}
        }
    `
}
export const tablet = (props) => {
    return css`
        @media screen and (min-width:768px ) and (max-width:992px) {
            ${props}
        }
    `
}