const path = require("path");

module.exports = {
    mode: 'development',
    entry: ["babel-polyfill", "./src/script.js"],    
    output: {   
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" 
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true
    },
    module: {
        rules: [    // Règles
            {
                test: /\.js$/,   // Je test avec une expression régulière si ce fichier est un fichier JS 
                exclude: /node_modules/,    // J'exclu une certaine partie, J'exclu le dossier node_modules
                use: {  // C'est un objet : Utilisation : ce qu'on va faire
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                } 
            }
        ]   
    }
}