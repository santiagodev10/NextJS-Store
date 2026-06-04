import sanitizeHtml from "sanitize-html";

const DEFAULT_TEXT = "Sin descripcion disponible para este producto.";

const sanitizeOptions = {
	allowedTags: [
		"p",
		"br",
		"strong",
		"b",
		"em",
		"i",
		"u",
		"ul",
		"ol",
		"li",
		"blockquote",
		"code",
		"pre",
		"a"
	],
	allowedAttributes: {
		a: ["href", "name", "target", "rel"]
	},
	allowedSchemes: ["http", "https", "mailto"],
	allowProtocolRelative: false,
	transformTags: {
		a: sanitizeHtml.simpleTransform("a", {
			target: "_blank",
			rel: "noopener noreferrer nofollow"
		})
	}
};

export const SanitizedHtml = ({ html, className, fallback = DEFAULT_TEXT }) => {
	const cleanHtml = sanitizeHtml(html || "", sanitizeOptions).trim();

	if (!cleanHtml) {
		return <p className={className}>{fallback}</p>;
	}

	return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />; //si primero sanitizas con una whitelist estricta (como aquí), usar dangerouslySetInnerHTML es el mecanismo correcto para renderizar HTML enriquecido.
};
