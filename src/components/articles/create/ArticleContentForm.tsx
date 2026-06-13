interface Props {
    title: string;
    content: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: Record<string, string>;
}

const ArticleContentForm = ({ title, content, onChange, errors }: Props) => {
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-800 mb-4">Informations principales</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'article <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="Ex: 5 techniques pour gérer le stress au quotidien"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-800 mb-4">Contenu de l'article</h2>
                <textarea
                    name="content"
                    value={content}
                    onChange={onChange}
                    rows={14}
                    placeholder={"Rédigez le contenu complet de votre article ici...\n\nN'hésitez pas à être détaillé et à apporter de la valeur à vos lecteurs."}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{wordCount} mots</span>
                    <span>Temps de lecture estimé : {wordCount === 0 ? 0 : readingTime} min</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleContentForm;
