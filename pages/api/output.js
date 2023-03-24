export default async function handler(req, res){
    if (req.method == 'POST'){
        return await addBook(req, res);
    } else if (req.method === 'GET'){
        return await readBooks(req, res)
    }else{
        return res.status(405).json({message: 'Method not allowed'});
    }
}

async function readBooks(req, res){
    const body = req.body;
    try{
        const books = await prima.bookSuggestion.findMany();
        return res.status(200).json(books, {success: true});
    } catch (error){
        console.error(error.message);
        return res.status(500).json({error: error.message});
    }
}

async function addBook(req, res){
    const body = req.body;
    try{
        const newEntry = await prima.bookSuggestion.create({
            data: {
                bookTitle: body.title,
                bookAuthor: body.author,
                bookGenre: body.genre,
                bookDescription: body.description
            }
        })
        return res.status(200).json(newEntry, {success: true});
    } catch (error){
        console.error(error.message);
        return res.status(500).json({error: error.message});
    }
}