from celery import shared_task

@shared_task
def push_ticket_to_workflow(ticket_data):
    # This will be picked up and executed by `workflow_api`
    pass