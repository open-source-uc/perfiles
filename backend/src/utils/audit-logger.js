import prisma from '../client.js';

// const entryPrototype = {
//   service: "achievements",
//   action: "create",
//   createdAt: new Date(),
//   actor:
//   data: {
//     id: '1',
//     name: 'First Achievement',
//     description: 'This is the first achievement',
//     imageURL: 'https://example.com/first-achievement.png',
//     level: '1',
//   },
// };

// formatters[entryPrototype.service][entryPrototype.action](entryPrototype.data);

// formatters contains functions that format the data field of the audit log

class AuditLogger {
  constructor() {
    this.services = {};
    this.actions = {};
    this.formatters = {};
  }

  register(service, action, formatter) {
    // Check that service and action are strings
    if (typeof service !== 'string' || typeof action !== 'string') {
      throw new Error('Service and action must be strings');
    }
    if (!this.services[service]) {
      this.services[service] = {};
    }
    // Check that formatter is a function
    if (typeof formatter !== 'function') {
      throw new Error('Formatter must be a function');
    }
    this.services[service][action] = formatter;
    this.formatters[service] = this.formatters[service] || {};
    this.formatters[service][action] = formatter;
  }

  getFormatter(service, action) {
    if (!this.formatters[service] || !this.formatters[service][action]) {
      return null;
    }
    return this.formatters[service][action];
  }

  formatEntry({
    service, action, data, actor = null,
  }) {
    const formatter = this.getFormatter(service, action);
    if (!formatter) {
      throw new Error(`No formatter found for service ${service} and action ${action}`);
    }
    // Formatter functions receive data and optionally, the actor
    return formatter(data, actor);
  }

  // eslint-disable-next-line class-methods-use-this
  async getEntriesByActor({
    actorUsername, limit = 10,
  }) {
    const query = prisma.auditEntry.findMany({
      where: {
        actor: {
          username: actorUsername,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    return query;
  }

  async getEntriesByService({
    service, limit = 10,
  }) {
    if (!this.services[service]) {
      throw new Error(`Inexistent service: ${service}`);
    }
    const query = prisma.auditEntry.findMany({
      where: {
        service,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    return query;
  }

  async getEntriesByAction({ service, action, limit = 10 }) {
    if (!this.services[service] || !this.services[service][action]) {
      throw new Error(`Inexistent service or action: ${service} ${action}`);
    }
    const query = prisma.auditEntry.findMany({
      where: {
        service,
        action,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    return query;
  }

  // eslint-disable-next-line class-methods-use-this
  async getRecentEntries(limit = 10, includeActor = false) {
    const query = prisma.auditEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        actor: includeActor,
      },
    });
    return query;
  }

  async getRecentMessages(limit = 20) {
    const entries = await this.getRecentEntries(limit, true);
    // Format each entry
    const messages = entries.map((entry) => ({
      ...entry,
      message: this.formatEntry(entry),
    }));

    return messages;
  }

  async log(service, action, data, actorUsername = null) {
    // Check that the service and action exist
    if (!this.services[service] || !this.services[service][action]) {
      throw new Error(`Inexistent service or action: ${service} ${action}`);
    }
    // Check that data is an object
    if (typeof data !== 'object') {
      throw new Error(`Data must be an object: ${data}`);
    }
    // Check that actorUsername is a string
    if (actorUsername && typeof actorUsername !== 'string') {
      throw new Error(`Actor username must be a string: ${actorUsername}`);
    }
    if (actorUsername) {
      const entry = await prisma.auditEntry.create({
        data: {
          createdAt: new Date(),
          service,
          action,
          data,
          actor: {
            connect: {
              username: actorUsername,
            },
          },
        },
        include: {
          actor: true,
        },
      });
      console.log(this.formatEntry(entry));
    } else {
      const entry = await prisma.auditEntry.create({
        data: {
          createdAt: new Date(),
          service,
          action,
          data,
        },
      });
      console.log(this.formatEntry(entry));
    }
  }
}
export default new AuditLogger();
