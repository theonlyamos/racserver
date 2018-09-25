const filetypes = { 'video': 'film',
                    'music': 'musical-notes',
                    'image': 'photos',
                    'document': 'document',
                    'text':  {'.pyw': 'logo-python',
                              '.py': 'logo-python',
                              '.html': 'logo-chrome',
                              '.html5': 'logo-html5',
                              '.css': 'logo-css3',
                              '.js': 'logo-nodejs',
                              'other': 'paper'},
                    'compressed': 'filing',
                    'executable': 'cube',
                    'other': 'cube'
                          }
const videos = ['.mp4', '.flv', '.mkv', '.avi']
const musics = ['.mp3', '.wav', '.m4a', '.ogg', '.wma']
const images = ['.jpg', '.jpeg', '.png', '.gif', '.svg']
const documents = ['.docx', '.doc', '.pdf', '.mobi', '.epub']
const textfiles = ['.txt', '.md', '.html', '.css', '.js', '.py', 
                   '.pyw', '.xml', '.ps1', '.sh', '.csv', '.json', 
                   '.c', '.cpp', '.php', '.log']
const compressed = ['.zip', '.iso', '.rar', '.tar', '.gz', '.gz2']
const executables = ['.exe', '.dmg', '.app', '.deb', '.msi']

module.exports = (extension) => {
    var extension = extension.toLowerCase()
    if (videos.includes(extension)) {
        return filetypes['video']
    }
    else if (musics.includes(extension)) {
        return filetypes['music']
    }
    else if (images.includes(extension)) {
        return filetypes['image']
    }
    else if (documents.includes(extension)) {
        return filetypes['document']
    }
    else if (textfiles.includes(extension)) {
        if (Object.keys(filetypes['text']).includes(extension)) {
            return filetypes['text'][extension]
        }
        return filetypes['text']['other']
    }
    else if (compressed.includes(extension)) {
        return filetypes['compressed']
    }
    else if (executables.includes(extension)) {
        return filetypes['executable']
    }
    else {
        return filetypes['other']
    }
}