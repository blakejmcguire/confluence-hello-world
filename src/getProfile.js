import ForgeUI, { render, Code, Macro, useState } from "@forge/ui"
import api from '@forge/api'

const getProfile = async () => {

    const github = api.asUser().withProvider('github', 'github-api')
    console.log(`hasCredentials: ${github.hasCredentials()}`)
    if (!await github.hasCredentials()) {
      await github.requestCredentials()
    }

    const response = await github.fetch('/user')

    if (response.ok) {
      return response.json()
    }

    return JSON.stringify({
      status: response.status,
      statusText: response.statusText,
      test: await response.text(),
    })
}

export default getProfile