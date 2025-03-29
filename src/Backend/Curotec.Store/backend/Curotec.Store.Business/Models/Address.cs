using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curotec.Store.Business.Models
{
    public class Address : Entity
    {
        public string Address1 { get; set; } = string.Empty;
        public string Address2 { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;

        /* EF Relation */
        public Guid ContractorId { get; set; }
        public Contractor Contractor { get; set; } = default!;
    }
}
