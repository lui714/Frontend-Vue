<template>
  <div class="algo">
    <div class="luis">
      <Header />
    </div>
    <div class="addSalir">
      <div class="add">
        <router-link to="/Add">
          <button id="add" class="mod btn btn-primary">
            <span class="material-icons-round">add_circle_outline</span>
          </button>
        </router-link>
      </div>
      <div class="salir">
        <router-link to="/Zapatos">
          <button id="close" class="mod btn btn-danger">Cerrar sesion</button>
        </router-link>
      </div>
    </div>
    <div class="centrar">
      <table class="tabla" v-for="zapato in zapatoList" :key="zapato.id">
        <tr class="id">
          <th>{{ zapato.id }}</th>
        </tr>
        <tr>
          <td class="tres">
            <img
              :src="zapato.thumbnailUrl"
              class="card-img-top"
              height="50"
              width="50"
            />
          </td>
          <td>{{ zapato.marca }}</td>
          <td>{{ zapato.modelo }}</td>
        </tr>
        <div class="botones">
          <div>
            <router-link :to="{ params: { id: zapato.id } }">
              <button
                @click="borrarYActualizar(zapato.id)"
                class="mod btn btn-danger"
              >
                <span class="material-icons-round">delete</span>
              </button>
            </router-link>
          </div>
          <div>
            <router-link to="/Update">
              <button class="mod btn btn-success">
                <span class="material-icons-round">edit</span>
              </button>
            </router-link>
          </div>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modificacion from "@/components/Estructura/Modificacion";
import Header from "@/components/Estructura/Header";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import { ref } from "vue";
import { zapatos } from "../../graphql/zapato.js";
import { borrarzapato } from "../../graphql/borrarzapato.js";
import gql from "graphql-tag";

export default {
  name: "Modificacion",
  components: {
    Header,
    Modificacion,
  },
  props: ["id"],

  setup() {
    const message = ref("hola sergio");
    const { result } = useQuery(zapatos);

    // console.log(result)
    const zapatoList = useResult(result, null, (data) => data.zapatoList);

    const { mutate: Mutation } = useMutation(gql`
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
    `);

    function borrarYActualizar(deleteZapatoId) {
      Mutation(
        { deleteZapatoId },
        {
          update: (store, {}) => {
            const data = store.readQuery({ query: borrarzapato });
            const updatedData = data.zapatoList.filter(
              (fil) => fil.deleteZapatoId !== deleteZapatoId
            );
            store.writeQuery({
              query: zapatos,
              data: { zapatoList: updatedData },
            });
          },
        }
      );
    }

    return { message, zapatoList, borrarYActualizar };
  },
};
</script>
