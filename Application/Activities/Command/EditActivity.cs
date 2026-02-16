using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Command;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context , IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync(request.Activity.ID, cancellationToken)
                ?? throw new Exception("Cannot find activity");

            // activity.Title = request.Activity.Title; automapper ekleyince bunu daha kısa yazarız
            mapper.Map(request.Activity, activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
