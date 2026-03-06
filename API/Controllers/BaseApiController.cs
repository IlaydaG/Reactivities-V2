using Application.Core;
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
    
        protected ActionResult<T> HandleResult<T>(Result<T> result)
        {
           if(!result.IsSuccess && result.Code == 404) return NotFound();

            if (result.IsSuccess && result.Value != null) return Ok(result.Value);

            return BadRequest(result.Error);
        }
    }
}
