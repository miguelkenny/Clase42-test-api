import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid`,
    padding: '0 4px',
  },
}));

const Image = styled.img`
  width: 50px;
  border-radius: 50%;
  margin: 0px auto;
`

const Navbar = () => {
  
  const quantity = useSelector(state => state.cart.quantity)
  let user = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  
  const handleClick = async () => {
    
    localStorage.removeItem('persist:root')

    navigate('/')

  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ES</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <NavLink to="/">
            <Logo>WOMEN-SHOP</Logo>
          </NavLink>
        </Center>
        <Right>

          {user === null ?
            <>
              <NavLink to="/register">
                <MenuItem>REGISTRARSE</MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem>LOGUIN</MenuItem>
              </NavLink>
            </>
            :
            <>
              <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
              <MenuItem>
                <Image alt={user.username} src={user.file} />
              </MenuItem>
            </>
          }

          <NavLink to="/cart">
            <MenuItem>
              <StyledBadge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </MenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;