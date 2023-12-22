i:
	npm install
run:
	npm run start:dev
init:
	npx prisma migrate dev --name init
mig:
	npx prisma db push --force-reset
stud:
	npx prisma studio
up:
	docker-compose up
down:
	docker-compose down --volumes --remove-orphans
	docker-compose rm --all --force --stop
	docker volume prune --all --force
	docker rmi -f postgres:alpine
l:
	npm run lint
f:
	npm run format
t:
	npm run test