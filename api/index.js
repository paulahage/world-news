const express = require('express')
const fs = require('fs')
const app = express()

const rawCountries = fs.readFileSync('./countries.json', 'utf-8')
const countries = JSON.parse(rawCountries)
const countryList = Object.keys(countries).map((key) => ({
    country: key.toLocaleLowerCase(),
    code: countries[key].toLocaleLowerCase()
}))

const rawResults = fs.readFileSync('./results.json', 'utf-8')
const allResults = JSON.parse(rawResults)
for(let i = 0; i < allResults.length; i++){
    allResults[i]['id'] = i
    allResults[i]['isSponsored'] = !!allResults[i]['isSponsored']

    const country = allResults[i]['country'].toLocaleLowerCase()
    const countryCode = countryList.find((item) => item.country === country)
    if(countryCode) {
        allResults[i]['image'] = `https://flagcdn.com/h60/${countryCode.code}.png`
    } else {
        console.log("nao", country)
    }
}

const Search = require('minisearch')
const search = new Search({
    fields: ['title','description'],
    storeFields: ['title', 'description', 'url', 'country', 'importance', 'isSponsored', 'image']
})

search.addAll(allResults)

app.get('/search', (req, res) => {
    const { query } = req.query
    
    console.log("QIERY", query)

    const results = search.search(query, { prefix: true, boost: { title: 2 },  fuzzy: 2.5  })

    res.send(results.map(({ title, description, url, country, importance, score, terms, isSponsored, image }) => ({
        score, terms, isSponsored, title, description, url, country, importance, image
    })))
})


const port = '3003'
app.listen(3003, () => {
    console.log(`escutando na porta :${port}`)
})