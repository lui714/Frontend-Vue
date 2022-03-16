import gql from 'graphql-tag'
export const zapatos = gql`
query zapatoList {
  zapatoList {
    id
    marca
    modelo
    publishedDate
    longDescription
    thumbnailUrl
    precio
    status
    tallas
  }
}
`