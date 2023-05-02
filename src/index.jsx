import ForgeUI, { render, Fragment, Text, Heading, Tabs, Tab, Table, Head, Row, Cell, Code, Macro, useState } from "@forge/ui"

const getProfile = async () => {
  const github = api.asUser().withProvider('github', 'github-api')
  if (!await github.hasCredentials()) await github.requestCredentials()
  const response = await github.fetch('/user')
  if (response.ok) return response.json()
  return {
    status: response.status,
    statusText: response.statusText,
    text: await response.text(),
  }
}

function row(key, value) {
  return (
    <Row>
      <Cell>
        <Text>{key}</Text>
      </Cell>
      <Cell>
        <Text>{value}</Text>
      </Cell>
    </Row>
  )
}

const App = () => {
  const [profile] = useState(getProfile())
  let jsx =
    <Fragment>
      <Tabs>
        <Tab label="Formatted">
          <Table>
            <Head>
              <Cell><Heading size="large">Github User Details</Heading></Cell>
              <Cell></Cell>
            </Head>
            {row('Name', profile.name)}
            {row('Username', profile.login)}
            {row('URL', profile.html_url)}
          </Table>
        </Tab>
        <Tab label="Raw data">
          <Code text={JSON.stringify(profile, null, 2)} language="json" showLineNumbers />
        </Tab>
      </Tabs>
      
    </Fragment>

  return jsx
  //<Code text={JSON.stringify(data, null, 2)} language="json" showLineNumbers />
}


export const run = render(
  <Macro
    app={<App />}
  />
)
