using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase  //Amaç Mediator injection’ı tek bir yere koymak.her yerde mediator yazmakla uğraşmamak
    {
        private IMediator? _mediator; //mediator parametre adı _mediator bu private field adı karıştırma

        protected IMediator Mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
