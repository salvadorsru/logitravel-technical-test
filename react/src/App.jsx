import Container from "@/components/Container/Container"
import ListForm from "@/lib/List/infra/ui/components/ListForm"

function App() {

  return (
    <main>
      <Container>
        <header>
          <h1>
            This is a technical proof
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu
            molestie
            maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra
            vestibulum
            venenatis phasellus.
          </p>
        </header>
        <ListForm></ListForm>
    </Container>
    </main>
  )
}

export default App
