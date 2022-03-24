
# api-express-borarachar
Api em express do capstone DivideComigo m3

Endpoint: https://api-express-dividecomigo.herokuapp.com/

# Users
 **Todas** as rotas users **necessitam** de um ***token***!

**GET /users**
Retorna um *array* com todos os usuário
```json
[
	{
		"_id": "623684c1e839661d4f83e076",
		"email": "prof@gayle.com",
		"name": "prof. gayle",
		"bio": "",
		"gender": "f",
		"phone": 21235497184,
		"avatar_url": "https://i.postimg.cc/L8W28BPy/female-avatar.png",
		"contacts": [],
		"searching_for": [],
		"already_member": [],
		"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
		"updated_at": null,
		"__v": 0
	},
	{
		"_id": "623684c1e839661d4f83e026",
		"email": "salma@felicita.com",
		"name": "salma felicita",
		"bio": "",
		"gender": "m",
		"phone": 81066971343,
		"avatar_url": "https://i.postimg.cc/jS2RTkDw/male-avatar.png",
		"contacts": [],
		"searching_for": [
			{
				"_id": "6234dac22c602cca71b86d1c",
				"image": "https://i.postimg.cc/HsnrbsyL/Apple-Music.jpg"
			},
			{
				"_id": "6234daaa2c602cca71b86d19",
				"image": "https://i.postimg.cc/7ZTbQsX8/TIDAL.jpg"
			}
		],
		"already_member": [],
		"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
		"updated_at": "Sun Mar 20 2022 01:34:59 GMT+0000 (Coordinated Universal Time)",
		"__v": 0
	},
	//...
```

**GET /users/:id**

Retorna um ***objeto*** com **todas as informações** do user do id passado
```json
{
	"_id": "623684c1e839661d4f83e030",
	"email": "leatha@lindsay.com",
	"name": "leatha lindsay",
	"bio": "",
	"gender": "f",
	"phone": 94428511670,
	"avatar_url": "https://i.postimg.cc/L8W28BPy/female-avatar.png",
	"contacts": [],
	"searching_for": [
		{
			"_id": "6234dcbe2c602cca71b86d3f",
			"image": "https://i.postimg.cc/PqsNGWFL/Xbox-Game-Pass.jpg"
		},
		{
			"_id": "6234dc482c602cca71b86d31",
			"image": "https://i.postimg.cc/5tLYj7Fq/Amazon-Prime-Video.jpg"
		}
	],
	"already_member": [],
	"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
	"updated_at": "Sun Mar 20 2022 01:34:59 GMT+0000 (Coordinated Universal Time)",
	"__v": 0
}
```
<hr>

**Patch /users/:id**

 - O **token fornecido** deve ser do **id do usuário** que se esta
   tentando dar patch.
 - **Sem retorno**.
 
**Nenhum dos campos é obrigatório**, atualiza apenas as seguintes informações:
```json
{ 
	name: "String", 
	bio: "String", 
	contacts: , //Ainda em produção 
	searching_for: ["streamingId"], 
	notification, //Ainda em produção
}
```

**Patch /users/:id/recovery/password**

- O **token fornecido** deve ser do **id do usuário** que se esta tentando dar patch.

Muda a ***senha do usuário*** caso os campos fornecidos (exceto newPassword) **estejam corretos**
```json
{
	"email": "email@email.com",
	"phone": 12345678912,
	"cpf": 12345678978,
	"newPassword": "123456"
}
```

**Delete /users/:id**

- O **token fornecido** deve ser do **id do usuário** que se esta tentando dar patch.
- **Sem retorno**

**Deleta** o usuário.

# Groups
 **Todas** as rotas groups **necessitam** de um ***token***!

**GET /users**
Retorna um *array* com todos os grupos
```json
[
	{
		"_id": "623684c1e839661d4f83e076",
		"email": "prof@gayle.com",
		"name": "prof. gayle",
		"bio": "",
		"gender": "f",
		"phone": 21235497184,
		"avatar_url": "https://i.postimg.cc/L8W28BPy/female-avatar.png",
		"contacts": [],
		"searching_for": [],
		"already_member": [],
		"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
		"updated_at": null,
		"__v": 0
	},
	{
		"_id": "623684c1e839661d4f83e026",
		"email": "salma@felicita.com",
		"name": "salma felicita",
		"bio": "",
		"gender": "m",
		"phone": 81066971343,
		"avatar_url": "https://i.postimg.cc/jS2RTkDw/male-avatar.png",
		"contacts": [],
		"searching_for": [
			{
				"_id": "6234dac22c602cca71b86d1c",
				"image": "https://i.postimg.cc/HsnrbsyL/Apple-Music.jpg"
			},
			{
				"_id": "6234daaa2c602cca71b86d19",
				"image": "https://i.postimg.cc/7ZTbQsX8/TIDAL.jpg"
			}
		],
		"already_member": [],
		"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
		"updated_at": "Sun Mar 20 2022 01:34:59 GMT+0000 (Coordinated Universal Time)",
		"__v": 0
	},
	//...
```

**GET /users/:id**

Retorna um ***objeto*** com **todas as informações** do user do id passado
```json
{
	"_id": "623684c1e839661d4f83e030",
	"email": "leatha@lindsay.com",
	"name": "leatha lindsay",
	"bio": "",
	"gender": "f",
	"phone": 94428511670,
	"avatar_url": "https://i.postimg.cc/L8W28BPy/female-avatar.png",
	"contacts": [],
	"searching_for": [
		{
			"_id": "6234dcbe2c602cca71b86d3f",
			"image": "https://i.postimg.cc/PqsNGWFL/Xbox-Game-Pass.jpg"
		},
		{
			"_id": "6234dc482c602cca71b86d31",
			"image": "https://i.postimg.cc/5tLYj7Fq/Amazon-Prime-Video.jpg"
		}
	],
	"already_member": [],
	"created_at": "Sat Mar 19 2022 23:17:24 GMT+0000 (Coordinated Universal Time)",
	"updated_at": "Sun Mar 20 2022 01:34:59 GMT+0000 (Coordinated Universal Time)",
	"__v": 0
}
```
<hr>

**Patch /users/:id**

 - O **token fornecido** deve ser do **id do usuário** que se esta
   tentando dar patch.
 - **Sem retorno**.
 
**Nenhum dos campos é obrigatório**, atualiza apenas as seguintes informações:
```json
{ 
	name: "String", 
	bio: "String", 
	contacts: , //Ainda em produção 
	searching_for: ["streamingId"], 
	notification, //Ainda em produção
}
```

**Patch /users/:id/recovery/password**

- O **token fornecido** deve ser do **id do usuário** que se esta tentando dar patch.

Muda a ***senha do usuário*** caso os campos fornecidos (exceto newPassword) **estejam corretos**
```json
{
	"email": "email@email.com",
	"phone": 12345678912,
	"cpf": 12345678978,
	"newPassword": "123456"
}
```

**Delete /users/:id**

- O **token fornecido** deve ser do **id do usuário** que se esta tentando dar patch.
- **Sem retorno**

**Deleta** o usuário.
