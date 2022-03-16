import gql from 'graphql-tag'
export const borrarzapato = gql`
mutation Mutation($deleteZapatoId: ID!) {
  deleteZapato(id: $deleteZapatoId) {
    status
    message
    data {
      ... on Zapato {
        id
        marca
        modelo
        publishedDate
        thumbnailUrl
        precio
        longDescription
        status
        tallas
      }
    }
  }
}

`