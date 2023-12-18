import { Button, styled } from "@mui/material";

const Btn = styled(Button)({
    textTransform: 'none',
    padding: '0.5rem 1rem',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 550,
    ':hover': {
        color: 'gray',
        border: '1px solid #fff',
        borderRadius: '0.3rem'
    }
});

export default Btn;