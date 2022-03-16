import gql from 'graphql-tag'
export const marcas = gql`
query MarcaList {
  marcasList {
    idm
    marca
  }
}

`