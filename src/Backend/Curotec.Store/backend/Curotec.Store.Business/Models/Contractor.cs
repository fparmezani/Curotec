namespace Curotec.Store.Business.Models
{
    public class Contractor : Entity
    {
        public string Name { get; set; } = string.Empty;
        public string Document { get; set; } = string.Empty;
        public Address Address { get; set; } = default!;
        public bool Active { get; set; }

        /* EF Relations */
        public IEnumerable<Product> Products { get; set; } = default!;
    }
}
