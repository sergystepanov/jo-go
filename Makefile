migrate:
	flyway migrate

migrate-back:
	flyway undo

.PHONY: migrate migrate-back
